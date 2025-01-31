import React, { useEffect, useState } from "react";

interface DynamicSelectProps {
  source: string; // The source prop in the format "x:y:z"
  portfolio_id: string;
  org_id: string;
}

interface ApiResponseItem {
  [key: string]: string | number; // A generic object representing the API response items
}

const DynamicSelect: React.FC<DynamicSelectProps> = ({ source, portfolio_id, org_id }) => {
  const [options, setOptions] = useState<ApiResponseItem[]>([]); // State to hold the fetched options
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [selectedValue, setSelectedValue] = useState<string | number>(""); // State to hold selected value

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
        const response = await dataResponse.json();
        const data: ApiResponseItem[] = response['items'];
        setOptions(data); // Set the options in state
      } catch (err) {
        setError("Error fetching data");
        console.error(err);
      } finally {
        setLoading(false); // Stop loading once the fetch is complete
      }
    };

    fetchData(); // Fetch data on component mount
  }, [resource]);

  // Handle selection change
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <label htmlFor="dynamic-select">Select an option:</label>
      <select
        id="dynamic-select"
        value={selectedValue}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded-md"
      >
        <option value="">Select an option</option>
        {options.map((item) => (
          <option key={item[valueField] as string} value={item[valueField]}>
            {item[labelField]}
          </option>
        ))}
      </select>
      {selectedValue && <div>Selected Value: {selectedValue}</div>}
    </div>
  );
};

export default DynamicSelect;