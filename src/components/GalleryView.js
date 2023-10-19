import classes from "./GalleryView.module.css";
import ProjectCard from "./ProjectCard";
const GalleryView = (props) => {
  return (
    <div className={classes.container}>
      {props.projects.map((project) => (
        <ProjectCard key={project.Title} project={project} />
      ))}
    </div>
  );
};

export default GalleryView;
