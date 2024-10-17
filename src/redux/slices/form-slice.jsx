import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: localStorage.getItem("name") || null,
  images: JSON.parse(localStorage.getItem("images")) || [],
  description: localStorage.getItem("description") || null,
  price: +localStorage.getItem("price") || null,
  status: "active",
  rent_price: +localStorage.getItem("rent_price") || null,
  color: localStorage.getItem("color") || null,
  colors: JSON.parse(localStorage.getItem("colors")) || [],
  model: localStorage.getItem("model") || null,
  category: localStorage.getItem("category") || null,
  year: +localStorage.getItem("year") || null,
  fuel: localStorage.getItem("fuel") || null,
  transmission: localStorage.getItem("transmission") || null,
  seats: +localStorage.getItem("seats") || null,
  thumbnail: localStorage.getItem("thumbnail") || null,
  discount: +localStorage.getItem("discount") || null,
  capacity_fuel: +localStorage.getItem("capacity_fuel") || null,
  usage_per_km: +localStorage.getItem("usage_per_km") || null,
};


const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateBasicInformation: (state, action) => {
      state.name = action.payload.name
      state.description = action.payload.description
      state.model = action.payload.model
      state.year = action.payload.year
      state.category = action.payload.category
      state.seats = action.payload.seats

      localStorage.setItem("name", action.payload.name)
      localStorage.setItem("description", action.payload.description)
      localStorage.setItem("model", action.payload.model)
      localStorage.setItem("year", action.payload.year)
      localStorage.setItem("category", action.payload.category)
      localStorage.setItem("seats", action.payload.seats)
    },
    updateVisualInformation: (state, action) => {
      state.images = action.payload.images
      state.thumbnail = action.payload.thumbnail

      localStorage.setItem("images", JSON.stringify(action.payload.images))
      localStorage.setItem("thumbnail", action.payload.thumbnail)
    },
    updateTechnicalInformation: (state, action) => {
      state.price = action.payload.price
      state.rent_price = action.payload.rent_price
      state.color = action.payload.color
      state.colors = action.payload.colors
      state.fuel = action.payload.fuel
      state.transmission = action.payload.transmission
      state.capacity_fuel = action.payload.capacity_fuel
      state.usage_per_km = action.payload.usage_per_km
      state.discount = action.payload.discount

      localStorage.setItem("price", action.payload.price)
      localStorage.setItem("rent_price", action.payload.rent_price)
      localStorage.setItem("color", action.payload.color)
      localStorage.setItem("colors", JSON.stringify(action.payload.colors))
      localStorage.setItem("fuel", action.payload.fuel)
      localStorage.setItem("transmission", action.payload.transmission)
      localStorage.setItem("capacity_fuel", action.payload.capacity_fuel)
      localStorage.setItem("usage_per_km", action.payload.usage_per_km)
      localStorage.setItem("discount", action.payload.discount)
    },
    clearForm: (state) => {
      state.name = null
      state.images = []
      state.description = null
      state.price = null
      state.status = "active"
      state.rent_price = null
      state.color = null
      state.colors = []
      state.model = null
      state.category = null
      state.year = null
      state.fuel = null
      state.transmission = null
      state.seats = null
      state.thumbnail = null
      state.discount = null
      state.capacity_fuel = null
      state.usage_per_km = null

      localStorage.removeItem("name");
      localStorage.removeItem("description");
      localStorage.removeItem("model");
      localStorage.removeItem("year");
      localStorage.removeItem("category");
      localStorage.removeItem("seats");
      localStorage.removeItem("price");
      localStorage.removeItem("rent_price");
      localStorage.removeItem("color");
      localStorage.removeItem("colors");
      localStorage.removeItem("fuel");
      localStorage.removeItem("transmission");
      localStorage.removeItem("capacity_fuel");
      localStorage.removeItem("usage_per_km");
      localStorage.removeItem("discount");
      localStorage.removeItem("images");
      localStorage.removeItem("thumbnail");
    }
  }
})

export const { updateBasicInformation, updateVisualInformation, updateTechnicalInformation, clearForm } = formSlice.actions

export default formSlice.reducer