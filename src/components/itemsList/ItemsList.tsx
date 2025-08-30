import React from 'react';
import type {Item} from "../../features/items/types.ts";
import CardItem from "../cardItem/CardItem.tsx";

interface ItemsListProps {
    items: Item[];
    onEdit: (item: Item) => void;
    onDelete: (id: string) => void;
}

const ItemsList: React.FC<ItemsListProps> = React.memo(({ items, onEdit, onDelete }) => {
    return (
        <div className="items-grid">
            {items.map((item: Item) => (
                <CardItem
                    key={item.id}
                    item={item}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
});

export default  React.memo(ItemsList);