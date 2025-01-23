import { Product, CreateProductInput } from "../types/types";

const styles = {
    form: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '1rem',
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '0.5rem',
    },
    label: {
        fontWeight: 'bold',
    },
    input: {
        padding: '0.5rem',
        fontSize: '1rem',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    textarea: {
        padding: '0.5rem',
        fontSize: '1rem',
        borderRadius: '4px',
        border: '1px solid #ccc',
        minHeight: '100px',
    },
    buttonGroup: {
        display: 'flex',
        gap: '1rem',
        marginTop: '1rem',
    },
    button: {
        padding: '0.5rem 1rem',
        fontSize: '1rem',
        borderRadius: '4px',
        border: 'none',
        cursor: 'pointer',
        backgroundColor: '#007bff',
        color: 'white',
    },
    cancelButton: {
        backgroundColor: '#6c757d',
    }
};

interface ProductFormProps {
    product: Product | CreateProductInput;
    onSubmit: (e: React.FormEvent) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onCancel: () => void;
    isLoading: boolean;
    submitButtonText: string;
    loadingButtonText: string;
}

const ProductForm = ({
    product,
    onSubmit,
    onChange,
    onCancel,
    isLoading,
    submitButtonText,
    loadingButtonText
}: ProductFormProps) => {
    return (
        <form onSubmit={onSubmit} style={styles.form}>
            <div style={styles.formGroup}>
                <label htmlFor="title" style={styles.label}>Product Name</label>
                <input
                    id="title"
                    name="title"
                    style={styles.input}
                    value={product.title}
                    onChange={onChange}
                    required
                />
            </div>

            <div style={styles.formGroup}>
                <label htmlFor="description" style={styles.label}>Description</label>
                <textarea
                    id="description"
                    name="description"
                    style={styles.textarea}
                    value={product.description}
                    onChange={onChange}
                    required
                />
            </div>

            <div style={styles.formGroup}>
                <label htmlFor="price" style={styles.label}>Price</label>
                <input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    style={styles.input}
                    value={product.price}
                    onChange={onChange}
                    required
                />
            </div>

            <div style={styles.formGroup}>
                <label htmlFor="image" style={styles.label}>Image URL</label>
                <input
                    id="image"
                    name="image"
                    type="url"
                    style={styles.input}
                    value={product.image}
                    onChange={onChange}
                    required
                />
            </div>

            <div style={styles.formGroup}>
                <label htmlFor="category" style={styles.label}>Category</label>
                <input
                    id="category"
                    name="category"
                    style={styles.input}
                    value={product.category}
                    onChange={onChange}
                    required
                />
            </div>

            <div style={styles.buttonGroup}>
                <button 
                    type="submit" 
                    style={styles.button}
                    disabled={isLoading}
                >
                    {isLoading ? loadingButtonText : submitButtonText}
                </button>
                <button
                    type="button"
                    style={{...styles.button, ...styles.cancelButton}}
                    onClick={onCancel}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default ProductForm; 