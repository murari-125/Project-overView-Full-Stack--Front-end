import * as React from "react";
import classes from "./ProjectCard.module.css";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useSpring, animated } from "@react-spring/web";

const Fade = React.forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function DetailedModal(props) {
  const project = props.project;
  return (
    <Modal
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      open={props.show}
      onClose={props.handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          TransitionComponent: Fade,
        },
      }}
    >
      <Fade in={props.show}>
        <Box sx={style}>
          <label className={classes.label}>
            <strong>Title:</strong>
          </label>
          <p className={classes.desc}>{project.Title}</p>
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
        </Box>
      </Fade>
    </Modal>
  );
}
