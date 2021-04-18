interface Props {
  streamUrl: string;
}

export const StreamView = ({ streamUrl }: Props) => {
  const isYouTube = /youtube\.com/.test(streamUrl);
  const embedUrl = isYouTube ? streamUrl.replace("watch?v=", "embed/") : "";
  return (
    <div>
      {embedUrl && (
        <iframe
          title={embedUrl}
          width="560"
          height="315"
          src={embedUrl}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="embed"
        />
      )}
      <a href={streamUrl} target="_blank" rel="noreferrer noopner">
        {streamUrl}
      </a>
    </div>
  );
};
