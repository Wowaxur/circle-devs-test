import React from 'react';
import type {Item} from "../../features/items/types.ts";
import '../../styles/cardItem.scss';

interface CardItemProps {
    item: Item;
    onEdit: (item: Item) => void;
    onDelete: (id: string) => void;
}

const CardItem: React.FC<CardItemProps> = ({ item, onEdit, onDelete }) => {
    return (
        <div className="item-card">
            <strong>{item.title}</strong>
            {item.description && <p>{item.description}</p>}
            <div>
                <button onClick={() => onEdit(item)}>Редактировать</button>
                {item.id && <button onClick={() => onDelete(item.id!)}>Удалить</button>}
            </div>
        </div>
    );
};

export default React.memo(CardItem);