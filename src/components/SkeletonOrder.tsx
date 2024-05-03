import React from "react";
import ContentLoader from "react-content-loader";

const SkeletonOrder: React.FC = (props) => (
  <ContentLoader
    speed={2}
    width={400}
    height={80}
    viewBox="0 0 400 80"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="14" rx="3" ry="3" width="83" height="53" />
    <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
    <rect x="122" y="12" rx="3" ry="3" width="258" height="53" />
  </ContentLoader>
);

export default SkeletonOrder;
