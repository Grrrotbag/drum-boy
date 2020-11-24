const DrumPadButton = (props) => {
  return (
    <button onClick={props.play} id={props.id} className="drum-pad btn">
      <audio className="clip" id={props.keyTrigger} src={props.url} />
      {props.keyTrigger}
    </button>
  );
};

export default DrumPadButton;
