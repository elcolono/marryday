import fetchAPI from "../../utils/fetchAPI";

export default function addProductImage(title: string, file: File, product: string) {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', title);
    formData.append('product', product);

    return fetchAPI('/api/v1/products/image/', {method: 'POST', body: formData})
}