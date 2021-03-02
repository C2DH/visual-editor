import React, { memo } from "react";
import { get } from "lodash";
import { connect } from "react-redux";
import GenericCard from "../GenericCard";
import { Button } from "reactstrap";
import "./ThemeCard.css";

import { makeTranslator } from "../../../state/selectors";

const ThemeCard = memo(
  ({
    theme,
    trans,
    onDeleteClick,
    showBackButton = false,
    showAheadButton = false,
    onBackClick,
    onAheadClick
  }) => (
    <GenericCard
      className="ThemeCard__card"
      slug={theme.slug}
      title={trans(theme, "data.title")}
      backgroundType={get(theme, "covers", []).length > 0 ? "image" : "color"}
      backgroundImage={get(theme, "covers[0].data.resolutions.medium.url")}
      backgroundColorOverlay={get(theme, "data.background.overlay")}
      backgroundColor={get(theme, "data.background.backgroundColor")}
      bbox={get(theme, "data.background.bbox")}
      pubblished={get(theme, "status") === "public"}
      editButtons={
        <div className="ThemeCard__buttons">
          {showBackButton && (
            <Button onClick={onBackClick}>
              <i className="fa fa-arrow-left" aria-hidden="true" />
            </Button>
          )}
          {showAheadButton && (
            <Button onClick={onAheadClick}>
              <i className="fa fa-arrow-right" aria-hidden="true" />
            </Button>
          )}
        </div>
      }
      footerButton={
        <Button onClick={onDeleteClick}>
          <i className="fa fa-trash-o" aria-hidden="true" />
        </Button>
      }
    />
  )
);

const mapStateToProps = state => ({
  trans: makeTranslator(state)
});

export default connect(mapStateToProps)(ThemeCard);
