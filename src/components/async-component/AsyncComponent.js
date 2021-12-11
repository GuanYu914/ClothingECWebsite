import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Loader from "../loader";

export default function AsyncComponent({ componentPromise, children }) {
  const [componentState, setComponentState] = useState(false);
  useEffect(() => {
    componentPromise().then(() => {
      setComponentState(true);
    });
  }, []);

  return <>{componentState ? children : <Loader />}</>;
}

/*
  props 參數
  componentPromise: function  (required)
  children        : any       (required)
*/

AsyncComponent.propTypes = {
  componentPromise: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
};
