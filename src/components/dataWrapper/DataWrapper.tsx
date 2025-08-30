import React from "react";

type DataWrapperProps<T> = {
    isLoading: boolean;
    isError: boolean;
    data?: T[];
    emptyMessage?: string;
    children: React.ReactNode;
};

function DataWrapper<T>({
                            isLoading,
                            isError,
                            data,
                            emptyMessage = "Нет элементов",
                            children,
                        }: DataWrapperProps<T>) {
    if (isLoading) {
        return (
            <div className="loading-overlay">
                <div className="spinner"></div>
            </div>
        );
    }

    if (isError) {
        return <p>Ошибка загрузки данных</p>;
    }

    if (data && data.length === 0) {
        return <p>{emptyMessage}</p>;
    }

    return <>{children}</>;
}

export default DataWrapper;