import React, { PureComponent, memo } from "react";
import { Container, Row, Col, Label, Button } from "reactstrap";
import GenericCard from "../cards/GenericCard";
import "./ChooseModule.css";
import textImage from "./imgs/text.png";
import objectImage from "./imgs/object.png";
import galleryImage from "./imgs/gallery.png";
import text_objectImage from "./imgs/text_object.png";
import text_galleryImage from "./imgs/text_gallery.png";
import mapImage from "./imgs/text.png";
import text_mapImage from "./imgs/text.png";

let modulesTypes = [
  { type: "text", label: "Module text", cover: textImage },
  { type: "object", label: "Module object", cover: objectImage },
  { type: "gallery", label: "Module gallery", cover: galleryImage },
  {
    type: "text_object",
    label: "Module text & object",
    cover: text_objectImage,
  },
  {
    type: "text_gallery",
    label: "Module text & gallery",
    cover: text_galleryImage,
  },
  {
    type: "video_interview",
    label: "Modul video interview",
    cover: objectImage,
  },
];

if (process.env.REACT_APP_MAPBOX_ACCESS_TOKEN) {
  modulesTypes = modulesTypes.concat([
    { type: "map", label: "Module map", cover: mapImage },
    { type: "text_map", label: "Module text & map", cover: text_mapImage }
  ])
}

const ChooseModuleCard = memo(({ title, cover, cardClick }) => (
  <GenericCard
    className="ChooseModule__ChooseModuleCard"
    containerClassName="ChooseModule__ChooseModuleCard__img"
    title={title}
    backgroundImage={cover}
    cardClick={cardClick}
  />
));

class ChooseModule extends PureComponent {
  render() {
    const { onChooseModule, onBack } = this.props;

    return (
      <Container fluid className="margin-r-l-20">
        <Row>
          <Col md="3">
            <div className="ChooseModule__sidecontainer">
              <Label for="exampleSelect">Choose a module</Label>
              <div className="Module__action_bottom_btn_container">
                <hr />
                <Button size="sm" block onClick={onBack}>
                  Back
                </Button>
              </div>
            </div>
          </Col>
          <Col md="9" className="ChooseModule__mods_container">
            <Row>
              {modulesTypes.map((modtype, i) => (
                <Col md="4" key={i}>
                  <ChooseModuleCard
                    title={modtype.label}
                    cardClick={() => onChooseModule(modtype.type)}
                    cover={modtype.cover}
                  />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ChooseModule;
