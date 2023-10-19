// ProjectCard.js
import React, { useState } from "react";
import classes from "./ProjectCard.module.css";
import DetailedModal from "./DetailedModal";

const ProjectCard = ({ project }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className={classes.projectCard}>
      <DetailedModal
        show={showModal}
        handleClose={() => {
          setShowModal(!showModal);
        }}
        project={project}
      />
      <div
        className={classes.projectDetails}
        onClick={() => {
          setShowModal(!showModal);
        }}
      >
        <h3>{project.Title}</h3>
        <label className={classes.label}>
          <strong>Technologies:</strong>
        </label>
        <p className={classes.desc}>{project.Technologies}</p>
        <label className={classes.label}>
          <strong>Frontend:</strong>
        </label>
        <p className={classes.desc}>{project.Frontend}</p>
        <label className={classes.label}>
          <strong>Backend:</strong>
        </label>
        <p className={classes.desc}>{project.Backend}</p>
        <label className={classes.label}>
          <strong>Availability:</strong>
        </label>
        <p className={classes.desc}>{project.Availability}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
