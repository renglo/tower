// Define the type for a single field object (based on the blueprint fields)
interface Field {
    name: string;
    type: string;
    widget: string;
    options?: { [key: string]: string }; // Optional options field for enum-like types
    cardinality: string;
    default: string;
    hint: string;
    id: string;
    label: string;
    layer: number;
    multilingual: boolean;
    order: number;
    required: boolean;
    semantic: string;
    source: string;
  }

// Declare the Blueprint interface
export interface Blueprint {
    label: string;
    fields?: Field[]; // Mark 'fields' as optional
    rich?: { [key: string]: { [key: string]: string } }; // Declare 'rich' as optional with a dynamic structure
    sources?: { [key: string]: string };
    [key: string]: any;
}

// Declare the DataItem interface
export interface DataItem {
    _id: string; // Add other properties as needed
    [key: string]: any; // Adjust this to the specific structure of your data
}

// Async function to fetch data based on valid source and update blueprint
export const overloadBlueprint = async (currentBlueprint: Blueprint, portfolio_id: string, org_id: string): Promise<Blueprint | null> => {
    console.log('Running overloadBlueprint function');

    // Work with the blueprint passed from fetchBlueprint
    if (!currentBlueprint || !currentBlueprint.fields) return null;

    const updatedBlueprint = { ...currentBlueprint, rich: { ...currentBlueprint.rich } };

    if (!updatedBlueprint.rich) {
        updatedBlueprint.rich = {};
    }

    if (!updatedBlueprint.sources) {
        updatedBlueprint.sources = {};
    }

    for (const field of currentBlueprint.fields) {
        if (field.source) {
            const regex = /^[a-zA-Z0-9_]+:[a-zA-Z0-9_]+:[a-zA-Z0-9_]+(,[a-zA-Z0-9_]+)*$/;

            if (regex.test(field.source)) {
                const [x, y, z] = field.source.split(':');
                // x: Ring

                // Generate "sources" object
                if (field.name) {
                    updatedBlueprint.sources[field.name] = field.source;
                }

                // Generate "rich" object
                try {

                    const params = new URLSearchParams({
                        all:'true',
                    });

                    const dataResponse = await fetch(`${import.meta.env.VITE_API_URL}/_data/${portfolio_id}/${org_id}/${x}?${params.toString()}`, {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${sessionStorage.accessToken}`,
                        },
                    });

                    const response = await dataResponse.json();
                    const data = response['items'];

                    if (!updatedBlueprint.rich[x]) {
                        updatedBlueprint.rich[x] = {};
                    }

                    data.forEach((item: DataItem) => {
                        const yValue = item[y];
                        // const zValue = item[z]; // Remove this line if zValue is not needed

                        // Safely split z if it contains a comma
                        const zKeys = z.split(',').map(key => key.trim());
                        const concatenatedZValue = zKeys.map(key => item[key]).filter(value => value).join(', '); // Concatenate non-empty values

                        if (yValue && concatenatedZValue) {
                            updatedBlueprint.rich[x][yValue] = concatenatedZValue; // Use concatenated value
                        }
                    });
                } catch (error) {
                    console.error(`Error fetching data for ${x}:`, error);
                }
            }
        }
    }

    console.log('Overloaded Blueprint:');
    console.log(updatedBlueprint);
    return updatedBlueprint; // Return the updated blueprint
}

// Export the replaceUUID function for use in other components
export const replaceUUID = async (currentData: DataItem[], currentBlueprint: Blueprint): Promise<DataItem[]> => {

    console.log("RICH BLUEPRINT @ replaceUUID:")
    console.log(currentData);
    console.log(currentBlueprint);

    // To Replace UUIDs with Human Readable object names
    // 1. Iterate through currentData which is a list of objects
    const updatedData = currentData.map((item: DataItem) => {
        const updatedItem: DataItem = { ...item }; // Create a copy of the item

        // 2. In each object, iterate through each attribute and replace the UUID
        for (const key in updatedItem) {
            if (updatedItem.hasOwnProperty(key)) {
                const value = updatedItem[key];
                // Replace UUID with human-readable name
                const sourceKey = currentBlueprint.sources?.[key];
                updatedItem[key] = sourceKey && currentBlueprint.rich 
                ? currentBlueprint.rich[sourceKey.split(':')[0]]?.[value] ?? value 
                : value;

                //console.log(`Updated key:${key}`);
                //console.log(sourceKey);
                //console.log(blueprint?.rich[sourceKey.split(':')[0]]?.[value] ?? value);
            }
        }

        //console.log('Updated Item:');
        //console.log(updatedItem);

        return updatedItem; // Return the updated item
    });

    //console.log('Updated Data:');
    //console.log(updatedData);

    // Return the updated data instead of setting it directly
    return updatedData; // Return the updated data
}