import fetchAPI from "../../utils/fetchAPI";

export default function addProductImage(title: string, file: File, product: string) {
    console.log("File", file)

    const formData = new FormData();
    formData.append('image', file, 'Das ist ein Filetitle');
    formData.append('title', title);
    formData.append('product', product);

    console.log('formDataNew', formData)

    return fetchAPI(
        '/api/v1/products/image/',
        {method: 'POST', body: formData, isForm: true}
    )
}