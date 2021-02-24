export const SpeakerDeck = ({
  embedId,
  width,
  title,
}: {
  embedId: string;
  width: string;
  title: string;
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
          title={title}
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
        />
      </div>
    </div>
  );
};
