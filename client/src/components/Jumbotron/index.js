import React from "react";

const styles = {
  jumbo: {
    backgroundColor: 'white',
    height: 300, clear: "both", textAlign: "center"
  },
  heading: {

  }
};

function Jumbotron({ children }) {
  return (
    <div
      style={styles.jumbo}
      className="jumbotron"
    >
      {children}
    </div>
  );
}

export default Jumbotron;
