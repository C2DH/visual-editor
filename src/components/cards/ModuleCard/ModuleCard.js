import React from "react";
import { get } from "lodash";
import { pure } from "recompose";
import { connect } from "react-redux";
import { Card, Button } from "reactstrap";
import showdown from "showdown";
import htmlToText from "html-to-text";
import BackgroundPreview from "../../BackgroundPreview";
import "./ModuleCard.css";

import { makeTranslator } from "../../../state/selectors";

const safeMarkdown = markdown => {
  const converter = new showdown.Converter();
  const html = converter.makeHtml(markdown);
  const text = htmlToText.fromString(html, {
    ignoreHref: true,
    uppercaseHeadings: false
  });
  return text;
};

const getTitle = (module, trans) => {
  const moduleName = module.module.replace("_", " & ");

  switch (module.module) {
    case "text": {
      const text = safeMarkdown(trans(module, "text.content"));
      return `<span class="badge badge-primary">${moduleName}</span> ${text}`;
    }
    case "map":
    case "gallery":
    case "object": {
      const caption = trans(module, "caption");
      return `<span class="badge badge-primary">${moduleName}</span> ${safeMarkdown(
        caption
      )}`;
    }
    case "text_gallery": {
      const text = trans(module, "text.content");
      if (text) {
        return `<span class="badge badge-primary">${moduleName}</span> ${safeMarkdown(
          text
        )}`;
      }
      const caption = trans(module, "caption");
      if (caption) {
        return `<span class="badge badge-primary">${moduleName}</span> ${safeMarkdown(
          caption
        )}`;
      }
      break;
    }
    case "text_object": {
      const text = trans(module, "text.content");
      if (text) {
        return `<span class="badge badge-primary">${moduleName}</span> ${safeMarkdown(
          text
        )}`;
      }
      const caption = trans(module, "object.caption");
      if (caption) {
        return `<span class="badge badge-primary">${moduleName}</span> ${safeMarkdown(
          caption
        )}`;
      }
      break;
    }
    case "text_map": {
      const text = trans(module, "text.content");
      if (text) {
        return `<span class="badge badge-primary">${moduleName}</span> ${safeMarkdown(
          text
        )}`;
      }
      const caption = trans(module, "map.caption");
      if (caption) {
        return `<span class="badge badge-primary">${moduleName}</span> ${safeMarkdown(
          caption
        )}`;
      }
      break;
    }
    default:
  }
  return `<span class="badge badge-primary">${moduleName}</span>`;
};

const symbolicBackground = module => ({
  backgroundImage: `/modules/${module.module}.png`,
  backgroundType: "image",
  symbolic: true
});

const standardBackground = module => {
  // No shit...
  if (
    get(module, "background.object") &&
    !get(module, "background.object.id")
  ) {
    return symbolicBackground(module);
  }

  return {
    backgroundImage: get(
      module,
      "background.object.id.data.resolutions.medium.url"
    ),
    backgroundColor: get(module, "background.color"),
    backgroundColorOverlay: get(module, "background.object.overlay"),
    backgroundType: get(module, "background.object.id.attachment")
      ? "image"
      : "color",
    bbox: get(module, "background.object.bbox", [])
  };
};

const getBackground = module => {
  switch (module.module) {
    case "object": {
      if (get(module, "type") === "image") {
        return {
          backgroundImage: get(module, "id.data.resolutions.medium.url"),
          backgroundType: "image"
        };
      }
      break;
    }
    case "gallery": {
      if (get(module, "objects[0].id")) {
        return {
          backgroundImage: get(
            module,
            "objects[0].id.data.resolutions.medium.url"
          ),
          backgroundType: "image"
        };
      }
      break;
    }
    case "text_gallery": {
      if (get(module, "gallery.objects[0].id")) {
        return {
          backgroundImage: get(
            module,
            "gallery.objects[0].id.data.resolutions.medium.url"
          ),
          backgroundType: "image"
        };
      }
      break;
    }
    case "text_object": {
      if (get(module, "object.type") === "image") {
        return {
          backgroundImage: get(module, "object.id.data.resolutions.medium.url"),
          backgroundType: "image"
        };
      }
      break;
    }
    case "map":
      return symbolicBackground(module);
    default:
      return standardBackground(module);
  }
  return symbolicBackground(module);
};

const ModuleCard = pure(
  ({
    module,
    trans,
    onDeleteClick,
    onMoveLeftClick,
    onMoveRightClick,
    onEditClick,
    showLeftButton = true,
    showRightButton = true
  }) => {
    const {
      backgroundImage,
      backgroundColor,
      backgroundColorOverlay,
      backgroundType,
      symbolic,
      bbox
    } = getBackground(module);
    return (
      <div>
        <Card className="ModuleCard__card">
          <BackgroundPreview
            containerClassName={`ModuleCard__div_img${
              symbolic ? "_symbolic" : ""
            }`}
            overlayClassName="ModuleCard__div_img_overlay"
            backgroundImage={backgroundImage}
            backgroundColor={backgroundColor}
            backgroundColorOverlay={backgroundColorOverlay}
            backgroundType={backgroundType}
            bbox={bbox}
          />
          <div className="ModuleCard__editButtons_container">
            <div className="w-100 flex">
              {showLeftButton && (
                <Button
                  onClick={onMoveLeftClick}
                  className="ModuleCard__btn_margin"
                >
                  <i className="fa fa-arrow-up" aria-hidden="true" />
                </Button>
              )}
              {showRightButton && (
                <Button onClick={onMoveRightClick}>
                  <i className="fa fa-arrow-down" aria-hidden="true" />
                </Button>
              )}
              <Button
                onClick={onEditClick}
                className="ModuleCard__btn_margin flex-right"
              >
                <i className="fa fa-pencil" aria-hidden="true" />
              </Button>
              <Button onClick={onDeleteClick}>
                <i className="fa fa-trash-o" aria-hidden="true" />
              </Button>
            </div>
          </div>
          <div
            className="ModuleCard__textContainer"
            dangerouslySetInnerHTML={{ __html: getTitle(module, trans) }}
          />
        </Card>
      </div>
    );
  }
);

const mapStateToProps = state => ({
  trans: makeTranslator(state)
});

export default connect(mapStateToProps)(ModuleCard);
