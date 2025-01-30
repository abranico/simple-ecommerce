export async function getProducts() {
  const response = await fetch("https://fakestoreapi.com/products");
  if (!response.ok) throw new Error();
  return response.json();
}
