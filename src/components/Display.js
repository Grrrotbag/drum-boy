const Display = (props) => {
  return (
    <div>
      <p>{props.text}</p>
      <br />
      <p>Volume: {Math.round(props.vol * 100)}%</p>
      <p>Mode: {props.mode[0].id === "Dark-Horn-Stab" ? "Retro" : "Synth"}</p>
    </div>
  );
};

export default Display;
