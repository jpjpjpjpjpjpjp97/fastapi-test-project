import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import "../styles/app.css";
import axiosConfig from "../utils/axiosConfig";

type ItemState = {
    id: number;
    name: string;
    description: string;
    price: number;
    tax: number;
};

const getItems = async (
    setItems: React.Dispatch<React.SetStateAction<ItemState[]>>,
) => {
    try {
        const response: AxiosResponse = await axiosConfig.get(`/api/v1/items/`);
        const response_data: Array<ItemState> = await response.data;
        setItems(response_data);
    } catch (error) {
        console.log(error);
    }
};

function Items() {
    const [items, setItems] = useState<Array<ItemState>>([]);

    useEffect(() => {
        getItems(setItems);
    }, []);

    return !items.length ? (
        <div>Loading...</div>
    ) : (
        <div>
            <div>Authenticated! Main Page.</div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Tax</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.price}</td>
                            <td>{item.tax}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Items;
