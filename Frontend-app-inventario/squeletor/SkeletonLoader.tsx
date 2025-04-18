import React from "react";
import ContentLoader, { Rect,Circle } from "react-content-loader/native"; // Importar el loader

const SkeletonLoader = () => {
  return (
    <ContentLoader
      speed={1}
      width={440}
      height={350}
      viewBox="0 0 350 200"
      backgroundColor="#e0e0e0"
      foregroundColor="#b0b0b0"
      style={{ marginTop: 10 }}
    >
      {/* Líneas con círculos a la derecha */}
      {[...Array(5)].map((_, index) => (
        <React.Fragment key={index}>
          <Rect x="0" y={index * 40} rx="5" ry="5" width="80%" height="20" />
          <Circle cx="330" cy={index * 40 + 10} r="10" />
        </React.Fragment>
      ))}
    </ContentLoader>
  );
};

export default SkeletonLoader;
