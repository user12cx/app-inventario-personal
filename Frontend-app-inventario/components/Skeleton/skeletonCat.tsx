// import React from 'react';
// import { View } from 'react-native';
// import SkeletonPlaceholder from 'react-native-skeleton-placeholder';


// const CategoriasSkeleton = () => {
//   return (
//     <SkeletonPlaceholder borderRadius={4}>
//       <SkeletonPlaceholder.Item marginBottom={12}>
//         {/* Repite esta estructura para simular filas */}
//         {[...Array(5)].map((_, index) => (
//           <SkeletonPlaceholder.Item
//             key={index}
//             flexDirection="row"
//             alignItems="center"
//             marginBottom={12}
//           >
//             <SkeletonPlaceholder.Item width={30} height={30} borderRadius={15} />
//             <SkeletonPlaceholder.Item marginLeft={12}>
//               <SkeletonPlaceholder.Item width={180} height={20} />
//               <SkeletonPlaceholder.Item
//                 marginTop={6}
//                 width={120}
//                 height={15}
//               />
//             </SkeletonPlaceholder.Item>
//           </SkeletonPlaceholder.Item>
//         ))}
//       </SkeletonPlaceholder.Item>
//     </SkeletonPlaceholder>
//   );
// };

// const ListCategoriasSkeleton: React.FC = () => {
//     return (
//       <SkeletonPlaceholder>
//         {/* Usamos un contenedor para envolver todos los Skeletons */}
//         <View>
//           {[...Array(5)].map((_, index) => (
//             <SkeletonPlaceholder.Item
//               key={index}
//               flexDirection="row"
//               alignItems="center"
//               marginBottom={12}
//             >
//               <SkeletonPlaceholder.Item width={30} height={30} borderRadius={15} />
//               <SkeletonPlaceholder.Item marginLeft={12}>
//                 <SkeletonPlaceholder.Item width={180} height={20} />
//                 <SkeletonPlaceholder.Item
//                   marginTop={6}
//                   width={120}
//                   height={15}
//                 />
//               </SkeletonPlaceholder.Item>
//             </SkeletonPlaceholder.Item>
//           ))}
//         </View>
//       </SkeletonPlaceholder>
//     );
//   };
// export {CategoriasSkeleton, ListCategoriasSkeleton}
