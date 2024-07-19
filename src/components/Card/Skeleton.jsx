import ContentLoader from "react-content-loader";

const Skeleton = () => {
  return (
    <>
      <ContentLoader
        speed={2}
        width={155}
        height={265}
        viewBox="0 0 155 265"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="0" y="36" rx="10" ry="10" width="155" height="90" />
        <rect x="0" y="142" rx="5" ry="5" width="155" height="15" />
        <rect x="0" y="161" rx="4" ry="4" width="93" height="15" />
        <rect x="0" y="207" rx="7" ry="7" width="80" height="24" />
        <rect x="122" y="200" rx="10" ry="10" width="32" height="32" />
      </ContentLoader>
    </>
  );
};

export default Skeleton;
