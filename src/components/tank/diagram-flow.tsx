import { sankey, sankeyCenter, sankeyLinkHorizontal, SankeyNodeMinimal } from "d3-sankey";
import { useEffect } from "react";

const MARGIN_Y = 25;
const MARGIN_X = 5;
//const COLORS = ["#e0ac2b", "#e85252", "#6689c6", "#9a6fb0", "#a53253"];
//const COLORS = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#00ffff"];
const COLORS = ["#37B34A","#8BC53F","#D6DE23","#e85252","#e0ac2b"];


import { useState } from "react";


// Define a custom type for the nodes
type CustomSankeyNode = SankeyNodeMinimal<{}, {}> & {
  name: string; // Add the name property
  category: string; // Ensure category is included
  color: number; // Ensure color is included
};


export default function FlowDiagram({ sankeyData }: { sankeyData: { nodes: CustomSankeyNode[]; links: { source: string; target: string; value: number; }[]; } }) {

  // We need to make a Deep copy of SankeyData. If not, the sankeyGenerator will change its structure
  // and the parent component won't be able to update it. 
  const [localSankeyData, setLocalSankeyData] = useState(() => JSON.parse(JSON.stringify(sankeyData)));
  
  useEffect(() => {
  
      // Update local state whenever sankeyData changes
      setLocalSankeyData(JSON.parse(JSON.stringify(sankeyData))); // Ensure deep copy
      console.log(sankeyData);
  }, [sankeyData]);


  
  const [width, setWidth] = useState<number>(window.innerWidth * 0.8);
  const [height, setHeight] = useState<number>(window.innerHeight * 0.8);
  //const [sankeyData, setSankeyData] = useState(modifiedData); // State to hold the modified data

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth * 0.8); // Example: set width to 80% of window width
      setHeight(window.innerHeight * 0.8); // Set height to 80% of window height
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty dependency array to run once on mount

  // Set the sankey diagram properties
  const sankeyGenerator = sankey() // TODO: find how to type the sankey() function
    .nodeWidth(16)
    .nodePadding(25)
    .extent([
      [MARGIN_X, MARGIN_Y],
      [width - MARGIN_X, height - MARGIN_Y],
    ])
    .nodeId((node) => (node as CustomSankeyNode).name) // Type assertion to CustomSankeyNode
    .nodeSort(() => 0) // Provide a function that returns 0 for no sorting
    .nodeAlign(sankeyCenter); // Algorithm used to decide node position


  // Compute nodes and links positions
  // @ts-ignore
  const { nodes, links } = sankeyGenerator(localSankeyData as { // Ensure data matches expected structure
    nodes: CustomSankeyNode[]; // Use CustomSankeyNode type
    links: { source: string; target: string; value: number; }[]; // Ensure target and source are typed as CustomSankeyNode
  });


  //
  // Draw the nodes
  //
  const allNodes = nodes.map((node) => {
    if (node.y1 !== undefined && node.y0 !== undefined) { // Check if y1 and y0 are defined
      return (
        <g key={node.index}>
          <rect
            height={node.y1 - node.y0}
            width={sankeyGenerator.nodeWidth()}
            x={node.x0}
            y={node.y0}
            stroke={"black"}
            fill={COLORS[(node as CustomSankeyNode).color]}
            fillOpacity={1}
            rx={0.9}
          />
        </g>
      );
    }
    return null; // Return null if node properties are undefined
  });

  //
  // Draw the links
  //
  const allLinks = links.map((link, i) => {
    const linkGenerator = sankeyLinkHorizontal();
    const path = linkGenerator(link);

    return (
      <path
        key={i}
        d={path || ""}
        stroke={COLORS[(link.target as CustomSankeyNode).color ?? 0]}
        fill="none"
        strokeOpacity={0.3}
        strokeWidth={link.width}
      />
    );
  });

  //
  // Draw the Labels
  //
  const allLabels = nodes.map((node, i) => {
    if (node.x0 !== undefined && node.x1 !== undefined && node.y1 !== undefined && node.y0 !== undefined) { // Check if x0, x1, y1, and y0 are defined
      
      // Find all links where the current node is the target
      const targetLinks = links.filter(link => (link.target as CustomSankeyNode).name === (node as CustomSankeyNode).name);
      const targetValue = targetLinks.reduce((sum, link) => sum + link.value, 0); // Sum the values of target links

      // Find all links where the current node is the source
      const sourceLinks = links.filter(link => (link.source as CustomSankeyNode).name === (node as CustomSankeyNode).name);
      const sourceValue = sourceLinks.reduce((sum, link) => sum + link.value, 0); // Sum the values of source links
      
      return (
        <text
          key={i}
          x={node.x0 < width / 2 ? node.x1 + 6 : node.x0 - 6}
          y={(node.y1 + node.y0) / 2}
          dy="0.35rem"
          textAnchor={node.x0 < width / 2 ? "start" : "end"}
          fontSize={12}
        >
          <tspan>{(node as CustomSankeyNode).name}</tspan>
          <tspan dy="1.2em" dx="-5em" fontSize="7">
            (${Math.max(targetValue, sourceValue).toLocaleString()})
          </tspan>
        </text>
      );
    }
    return null; // Return null if node properties are undefined
  });

  return (
    <div>

      {/*localSankeyData.links[1].value*/}
      
      <svg width={width} height={height}>
        {allLinks}
        {allNodes}
        {allLabels}
      </svg>
    </div>
  );
};
