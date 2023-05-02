import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import flashScreen from "../../view/flashScreen/index";
import signInScreen from "../../view/auth/signInScreen/index";
import signUpScreen from "../../view/auth/signUpScreen/index";
import dashboardScreen from "../../view/dashBoard/index";
import categoryScreen from "../../view/category";
import shopDetail from "../../view/shopDetail";
import productWithCat from "../../view/productWithCat";
import productSearch from "../../view/productSearch";
import profileEdit from "../../view/profileEdit";
import cartScreen from "../../view/cart";
import addressScreen from "../../view/address";
import addNewAddress from "../../view/address/addNewAddress";
const RootStack = createStackNavigator();

const rootStackScreen = () => (
  <RootStack.Navigator headerShown={false}>
    <RootStack.Screen
      name="flashScreen"
      component={flashScreen}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="signInScreen"
      component={signInScreen}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="signUpScreen"
      component={signUpScreen}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="dashboardScreen"
      component={dashboardScreen}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="categoryScreen"
      component={categoryScreen}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="shopDetailScreen"
      component={shopDetail}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="productWithCat"
      component={productWithCat}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="productSearch"
      component={productSearch}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="profileEdit"
      component={profileEdit}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="cartScreen"
      component={cartScreen}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="addressScreen"
      component={addressScreen}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="addNewAddress"
      component={addNewAddress}
      options={{ headerShown: false }}
    />
    {/*         
    
    
    
    <RootStack.Screen
      name="productDetailScreen"
      component={productDetailScreen}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="foodDetailScreen"
      component={foodDetailScreen}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="welcomScreen"
      component={welcomScreen}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="billScreen"
      component={billScreen}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="updateUserProfileScreen"
      component={updateUserProfile}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="userOrderManagementScreen"
      component={userOrderManagementScreen}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="updateProductScreen"
      component={updateProductScreen}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="ordersDetailBillScreen"
      component={ordersDetailBillScreen}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="productCategoryScreen"
      component={productCategoryScreen}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="foodCategoryScreen"
      component={foodCategoryScreen}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="homeScreen"
      component={homeScreen}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="foodScreen"
      component={foodScreen}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="addNewProductScreen"
      component={addNewProductScreen}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="addFoodCategoryScreen"
      component={addFoodCategoryScreen}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="addNewFoodScreen"
      component={addNewFoodScreen}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="updateFoodScreen"
      component={updateFoodScreen}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="addNewProductCategoryScreen"
      component={addNewProductCategoryScreen}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="updateProductCategoryScreen"
      component={updateProductCategoryScreen}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="changePasswordScreen"
      component={changePasswordScreen}
      options={{ headerShown: false }}
    /> */}

    {/* SERVER */}
    {/* 
    <RootStack.Screen
      name="SVHomeScreen"
      component={SVHomeScreen}
      options={{ headerShown: false }}
    />

    <RootStack.Screen
      name="SVManageProductCat"
      component={SVManageProductCat}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="SVManageFoodCat"
      component={SVManageFoodCat}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="SVAddNewProductCat"
      component={SVAddNewProductCat}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="SVAddNewFoodCat"
      component={SVAddNewFoodCat}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="SVUpdateProductCat"
      component={SVUpdateProductCat}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="SVOrderManagement"
      component={SVOrderManagement}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="SVOrderDetail"
      component={SVOrderDetail}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="SVFoodManage"
      component={SVFoodManage}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="SVFoodDetail"
      component={SVFoodDetail}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="SVAddNewFood"
      component={SVAddNewFood}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="SVManageProduct"
      component={SVManageProduct}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="SVAddNewProduct"
      component={SVAddNewProduct}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="SVDetailProduct"
      component={SVDetailProduct}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="SVUpdateFood"
      component={SVUpdateFood}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="SVUpdateProduct"
      component={SVUpdateProduct}
      options={{ headerShown: false }}
    /> */}

    {/* CLIENT */}
    {/* 
    <RootStack.Screen
      name="CLDashboardScreen"
      component={CLDashboardScreen}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="CLOrderManagementScreen"
      component={CLOrderManagementScreen}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="CLUpdateProfileScreen"
      component={CLUpdateProfileScreen}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="CLUpdatePasswordScreen"
      component={CLUpdatePasswordScreen}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="CLMarketNoteScreen"
      component={CLMarketNoteScreen}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="CLFavouriteFoodsScreen"
      component={CLFavouriteFoodsScreen}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="CLFoodsDetailScreen"
      component={CLFoodsDetailScreen}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="CLFoodsMaterialScreen"
      component={CLFoodsMaterialScreen}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="CLProductDetailScreen"
      component={CLProductDetailScreen}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="CLBillScreen"
      component={CLBillScreen}
      options={{ headerShown: false }}
    /> */}
  </RootStack.Navigator>
);

export default rootStackScreen;
