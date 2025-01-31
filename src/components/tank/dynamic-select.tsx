import React, { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"; 

interface DynamicSelectProps {
  label?: string;
  hint?: string;
  source: string; // The source prop in the format "x:y:z"
  portfolio_id: string;
  org_id: string;
  onValueChange: (value: string) => void; // Callback prop to pass value to parent
  default_value?: string;
}

interface ApiResponseItem {
  [key: string]: string | number; // A generic object representing the API response items
}

const DynamicSelect: React.FC<DynamicSelectProps> = ({ label, hint, source, portfolio_id, org_id, onValueChange, default_value }) => {
  const [options, setOptions] = useState<ApiResponseItem[]>([]); // State to hold the fetched options
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [selectedValue, setSelectedValue] = useState<string | number>(""); // State to hold selected value


  // 1. Check if default_value is a UUID
  // 2. If yes, replace its value with ut


  // Split the source prop to extract x, y, z
  const [resource, valueField, labelField] = source.split(":");


  useEffect(() => {
    // Function to fetch data from the API endpoint
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading to true when fetching data

        const dataResponse = await fetch(`${import.meta.env.VITE_API_URL}/_data/${portfolio_id}/${org_id}/${resource}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${sessionStorage.accessToken}`,
          },
        });

        if (!dataResponse.ok) {
          throw new Error("Failed to fetch options");
        }
        let data: ApiResponseItem[] = (await dataResponse.json()).items; // Extract the "items" object from the response

        // Sort options alphabetically by labelField (z)
        data = data.sort((a, b) => {
          const labelA = a[labelField]?.toString().toLowerCase();
          const labelB = b[labelField]?.toString().toLowerCase();
          return labelA.localeCompare(labelB);
        });

        setOptions(data); // Set the sorted options in state
        console.log('options:',data);
        //if (data.length > 0) {
          //handleValueChange (String(data[0][valueField]));
        //  console.log('set select value:',String(data[0][valueField]));
        //}
      } catch (err) {
        setError("Error fetching data");
        console.error(err);
      } finally {
        setLoading(false); // Stop loading once the fetch is complete
      }
    };

    fetchData(); // Fetch data on component mount
  }, [resource, valueField, labelField, portfolio_id, org_id]);

  // Handle selection change and call the parent's onValueChange
  const handleValueChange = (value: string) => {
    setSelectedValue(value);
    onValueChange(value); // Pass selected value up to parent component
  };

  // Function to get the label by id
  const getLabelById = (id: string) => {
    const option = options.find(item => item[valueField] === id);
    return option ? option[labelField] : undefined; // Return the label or undefined if not found
  };

  const isUUID = (str: string): boolean => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(str);
  };

  let initialLabel; // Declare initialLabel outside the condition
  if (default_value) {
    if (isUUID(default_value)) {
      initialLabel = getLabelById(default_value);
    } else {
      initialLabel = String(default_value);
    }
  }


  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {hint && <p className="hint">{hint}</p>}
      <Select
        name={label}
        value={selectedValue ? String(selectedValue) : undefined}
        onValueChange={handleValueChange} // Use onValueChange instead of onChange
      >
        <SelectTrigger>
          <SelectValue placeholder={initialLabel} />
        </SelectTrigger>
        <SelectContent>
          {options.map((item) => (
            <SelectItem key={item[valueField] as string} value={String(item[valueField])}>
              {label}: {item[labelField]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default DynamicSelect;