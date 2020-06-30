import React from "react";
import { Card, CardTitle, Badge } from "reactstrap";
import BackgroundPreview from "../../BackgroundPreview";
import "./GenericCard.css";

const PublishedThemeLabel = ({ pos }) => (
  <div
    style={
      pos === "top"
        ? { padding: 3 }
        : { position: "absolute", bottom: 65, left: 5 }
    }
  >
    <Badge color="success">Published</Badge>
  </div>
);

const SelectedModuleLabel = () => (
  <div style={{ padding: 3 }}>
    <Badge color="success">Selected</Badge>
  </div>
);

const GenericCard = ({
  title = '',
  slug = '',
  backgroundType = "image",
  backgroundImage,
  backgroundColor,
  backgroundColorOverlay,
  bbox,
  pubblished,
  selected,
  cardClick = null,
  footerButton = null,
  editButtons = null,
  className = "GenericCard__card",
  containerClassName = "GenericCard__div_img",
  type
}) => (
  <div>
    <Card className={className} onClick={cardClick}>
      <BackgroundPreview
        containerClassName={containerClassName}
        overlayClassName="GenericCard__div_img_overlay"
        backgroundImage={backgroundImage}
        backgroundColor={backgroundColor}
        backgroundColorOverlay={backgroundColorOverlay}
        backgroundType={backgroundType}
        bbox={bbox}
      >
        {pubblished && (
          <PublishedThemeLabel pos={editButtons ? "bottom" : "top"} />
        )}
        {selected && <SelectedModuleLabel />}
      </BackgroundPreview>
      <div className="GenericCard__editButtons_container">{editButtons}</div>
      <div className="GenericCard__textContainer">
        <CardTitle className="GenericCard__title">
          {type && (
            <Badge color="secondary" className="mr-2">
              {type}
            </Badge>
          )}
          {!title.length && slug.length && (
            <em className="text-secondary">{slug}</em>
          )}{title}
        </CardTitle>
        <div className="GenericCard_footerButton">{footerButton}</div>
      </div>
    </Card>
  </div>
);

export default GenericCard;
