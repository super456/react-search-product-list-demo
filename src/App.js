import { useState } from "react";

/** 所有商品 */
const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
]

/** 商品分类 */
function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">{category}</th>
    </tr>
  )
}

/** 展示商品信息 */
function ProductRow({ product }) {
  const name = product.stocked ? product.name : <span style={{ color: 'red' }}>
    {product.name}
  </span>

  return (
    <tr>
      <td>{name}</td>
      <td colSpan="2">{product.price}</td>
    </tr>
  )
}

/** 搜索框 */
function SearchBar({ filterText, inStockOnly, onFilterTextChange, onInStockOnlyChange }) {
  return (
    <form>
      <input
        type="text"
        value={filterText}
        placeholder="请输入搜索关键词"
        onChange={(event) => onFilterTextChange(event.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(event) => onInStockOnlyChange(event.target.checked)}
        /> 只显示在库存中的商品
      </label>
    </form>
  )
}

/** 商品表格展示 */
function ProductTable({ products, filterText, inStockOnly }) {
  const rows = []
  let lastCategory = null

  products.forEach((product) => {
    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return
    }

    if (inStockOnly && !product.stocked) {
      return
    }

    if (product.category !== lastCategory) {
      rows.push((
        <ProductCategoryRow
          category={product.category}
          key={product.category}
        />
      ))
    }

    rows.push(
      <ProductRow
        product={product}
        key={product.name}
      />
    )

    lastCategory = product.category
  })

  return (
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>价格</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

/** 商品根组件 */
function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('')
  const [inStockOnly, setInStockOnly] = useState(false)

  return (
    <div>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly}
      />
      <ProductTable
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </div>
  )
}


export default function() {
  return <FilterableProductTable products={PRODUCTS} />
}
