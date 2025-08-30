import React, {useCallback, useEffect, useState} from 'react';
import {
    useGetItemsQuery,
    useAddItemMutation,
    useUpdateItemMutation,
    useDeleteItemMutation,
} from '../features/items/itemsApi.ts';
import type {Item} from '../features/items/types.ts';
import ModalConfirm from '../components/ModalConfirm.tsx';

import '../styles/ItemsPage.scss';
import ItemsList from "../components/itemsList/ItemsList.tsx";
import ItemForm from "../components/itemForm/ItemForm.tsx";
import DataWrapper from "../components/dataWrapper/DataWrapper.tsx";

const ItemsPage: React.FC = () => {
    const {data: items, isLoading, isError} = useGetItemsQuery();
    const [addItem, {isLoading: isAdding}] = useAddItemMutation();
    const [updateItem, {isLoading: isUpdating}] = useUpdateItemMutation();
    const [deleteItem, {isLoading: isDeleting}] = useDeleteItemMutation();
    const isLoadingAny = isLoading || isAdding || isUpdating || isDeleting;
    const [editingId, setEditingId] = useState<Item['id'] | null>(null);
    const [formTitle, setFormTitle] = useState<string>('');
    const [formDescription, setFormDescription] = useState<string>('');

    const [showModal, setShowModal] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [loaded, setLoaded] = useState(false);


    useEffect(() => {
        if (items !== undefined) {
            setLoaded(true);
        }
    }, [items]);

    const handleEdit = useCallback((item: Item) => {
        setEditingId(item.id!);
        setFormTitle(item.title || '');
        setFormDescription(item.description || '');
    }, []);

    const handleDeleteClick = useCallback((id: string) => {
        setDeleteId(id);
        setShowModal(true);
    }, []);

    const confirmDelete = async () => {
        if (!deleteId) return;
        setShowModal(false); // модалка закрывается
        await deleteItem(deleteId).unwrap(); // unwrap гарантирует, что промис корректно отработает
    };

    return (
        <section>
            {isLoadingAny && (
                <div className="loading-overlay">
                    <div className="spinner"></div>
                </div>
            )}
            <h1>Список элементов</h1>

            <ItemForm
                editingId={editingId}
                initialTitle={formTitle}
                initialDescription={formDescription}
                onSubmit={async (data, editingId) => {
                    if (editingId) {
                        await updateItem({id: editingId, ...data} as Item);
                    } else {
                        await addItem(data as Item);
                    }
                    setEditingId(null);
                    setFormTitle('');
                    setFormDescription('');
                }}
            />

            {/* Список элементов */}
            <DataWrapper<Item>
                isLoading={!loaded}
                isError={isError}
                data={items}
                emptyMessage="Нет элементов"
            >
                <ItemsList items={items || []}
                           onEdit={handleEdit}
                           onDelete={handleDeleteClick}
                />
            </DataWrapper>

            {/* Модалка подтверждения удаления */}
            {showModal && (
                <ModalConfirm
                    title="Удаление элемента"
                    message="Вы уверены, что хотите удалить этот элемент?"
                    seconds={5}
                    onConfirm={confirmDelete}
                    onClose={() => setShowModal(false)}
                />
            )}
        </section>
    );
};

export default ItemsPage;