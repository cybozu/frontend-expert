export const SpeakerDeck = ({
  embedId,
  width,
}: {
  embedId: string;
  width: string;
}) => {
  return (
    <div style={{ width }}>
      <div
        style={{
          left: 0,
          width: "100%",
          height: 0,
          position: "relative",
          paddingBottom: "74.9296%",
        }}
      >
        <iframe
          src={`https://speakerdeck.com/player/${embedId}`}
          style={{
            border: 0,
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            position: "absolute",
          }}
          allowFullScreen
          scrolling="no"
          allow="encrypted-media"
        ></iframe>
      </div>
    </div>
  );
};
