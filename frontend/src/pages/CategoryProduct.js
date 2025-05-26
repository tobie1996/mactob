import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import productCategory from '../helpers/productCategory'
import VerticalCard from '../components/VerticalCard'
import SummaryApi from '../common'

const CategoryProduct = () => {
  const [data, setData] = useState([])
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const location = useLocation()
  const urlSearch = new URLSearchParams(location.search)
  const urlCategoryListinArray = urlSearch.getAll("category")

  const urlCategoryListObject = {}
  urlCategoryListinArray.forEach(el => {
    urlCategoryListObject[el] = true
  })

  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject)
  const [filterCategoryList, setFilterCategoryList] = useState([])

  const [sortBy, setSortBy] = useState("")

  const fetchData = async (e) => {
    const response = await fetch(SummaryApi.filterProduct.url, {
      method: SummaryApi.filterProduct.method,
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        category: filterCategoryList
      })
    })

    const dataResponse = await response.json()
    setData(dataResponse?.data || [])
  }

  const handleSelectCategory = (e) => {
    e.preventDefault()
    const { name, value, checked } = e.target

    setSelectCategory((preve) => {
      return {
        ...preve,
        [value]: checked
      }
    })
  }

  useEffect(() => {
    fetchData()
  }, [filterCategoryList])

  useEffect((e) => {
    const arrayOfCategory = Object.keys(selectCategory).map(categoryKeyName => {
      if (selectCategory[categoryKeyName]) {
        return categoryKeyName
      }
      return null
    }).filter(el => el)

    setFilterCategoryList(arrayOfCategory)

    //format for url change when change on the checkbox
    const urlFormat = arrayOfCategory.map((el, index) => {
      if ((arrayOfCategory.length - 1) === index) {
        return `category=${el}`
      }
      return `category=${el}&&`
    })

    navigate("/product-category?" + urlFormat.join(""))
  }, [selectCategory])


  const handleOnChangeSortBy = (e) => {
    e.preventDefault()
    const { value } = e.target

    setSortBy(value)

    if (value === 'asc') {
      setData(preve => preve.sort((a, b) => a.sellingPrice - b.sellingPrice))
    }

    if (value === 'dsc') {
      setData(preve => preve.sort((a, b) => b.sellingPrice - a.sellingPrice))
    }
  }

  useEffect(() => {

  }, [sortBy])

  return (
    <div className='container mx-auto p-4'>

      {/***desktop version */}
      <div class="grid grid-cols-full lg:grid-cols-[200px,1fr] gap-4">
        <div class="bg-white p-2 overflow-y-scroll ">
          <div class="mb-4">  <h3 class="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300 medium">Sort by</h3>
            <form class="text-sm flex flex-col gap-2 py-2">
              <div class="flex items-center gap-3">
                <input type="radio" name="sortBy" checked={sortBy === "asc"} onChange={handleOnChangeSortBy} value="asc" />
                <label>Prix ​​croissant</label>
              </div>
              <div class="flex items-center gap-3">
                <input type="radio" name="sortBy" checked={sortBy === "dsc"} onChange={handleOnChangeSortBy} value="dsc" />
                <label>Prix - du haut au bas</label>
              </div>
            </form>
          </div>

          <div class="mb-4">
            <h3 class="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">Category</h3>
            <form class="text-sm flex flex-col gap-2 py-2">
              {productCategory.map((categoryName, index) => (
                <div class="flex items-center gap-3" key={index}>  <input type="checkbox" name="category" checked={selectCategory[categoryName?.value]} value={categoryName?.value} id={categoryName?.value} onChange={handleSelectCategory} />
                  <label for={categoryName?.value}>{categoryName?.label}</label>
                </div>
              ))}
            </form>
          </div>
        </div>

        <div class="px-4">
          <p class="font-medium text-slate-800 text-lg my-2">Search Results: {data.length}</p>
          <div class="min-h-screen overflow-y-scroll lg:min-h-[calc(100vh-120px)] max-h-[calc(100vh-120px)]">
            {data.length !== 0 && !loading && (
              <VerticalCard data={data} loading={loading} />
            )}
          </div>
        </div>
      </div>

    </div>
  )
}

export default CategoryProduct