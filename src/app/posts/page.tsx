const PostsPage = async () => {
  const slugs = ((context) => {
    const keys = context.keys();
    const data = keys.map((key, index) => {
      const slug = key.replace(/^.*[\\/]/, "").slice(0, -3);
      return {
        slug: slug,
      };
    });
    return data;
  })(require.context("../../../data/posts", true, /\.md$/));
  return (
    <div>
      <h2>Posts</h2>
      {slugs.map(({ slug }) => {
        return <div key={slug}>{slug}</div>;
      })}
    </div>
  );
};

export default PostsPage;
