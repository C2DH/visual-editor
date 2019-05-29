import React from "react";
import GenericCard from "../GenericCard";
import { Input, Button, Label } from "reactstrap";
import "./DocumentCard.css";

const DocumentCard = ({
  title = "",
  cover = null,
  checked,
  onClick,
  onChange,
  type
}) => (
  <GenericCard
    className="DocumentCard__card"
    title={title}
    type={type}
    backgroundImage={cover}
    footerButton={
      typeof onChange === "undefined" ? (
        <Button onClick={onClick}>
          <i className="fa fa-crosshairs" aria-hidden="true" />
        </Button>
      ) : (
        <Label check>
          <Input onChange={onChange} type="checkbox" checked={checked} />{" "}
        </Label>
      )
    }
  />
);

export default DocumentCard;
