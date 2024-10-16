/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable react/self-closing-comp */
/* eslint-disable padding-line-between-statements */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
"use client";

import { SearchIcon } from "@/src/components/icons";
import RecipePostCard from "@/src/components/ui/post/PostCard";
import { GetAllRecipe } from "@/src/services/Recipie";
import { Card } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { Skeleton } from "@nextui-org/skeleton";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const RecipiesPost = () => {
  const [Page, setPage] = useState(1);
  const [Recipies, setRecipies]: any = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setsearchTerm]: any = useState(" ");
  const [loading, setLoading] = useState(false); // Loading flag
  const [isFetching, setIsFetching] = useState(false);
  const [FilterRating, setFilterRating] : any = useState();
  const [FilterTimeing, setFilterTimeing] : any = useState()

  // Function to fetch recipes
  const fetchRecipes = async (resetPage = false) => {
    if (loading) return; // Prevent duplicate API calls
    setIsFetching(true); // Mark fetching as true
    setLoading(true); // Set loading flag

    try {
      if (resetPage) {
        setRecipies([]);
        setPage(1);
        setHasMore(true);
      }
     
      const pageToFetch = resetPage ? 1 : Page; // Ensure proper page state
    
      const response = await GetAllRecipe(
        pageToFetch,
        searchTerm.trim(),
        FilterRating,
        FilterTimeing
      );
 

      if (response?.data?.length > 0) {
        setRecipies((prevRecipes : any) => {
          // Filter out duplicates by comparing recipe IDs
          const newRecipes = response?.data?.filter(
            (newRecipe: any) =>
              !prevRecipes.some(
                (prevRecipe: any) => prevRecipe._id === newRecipe._id
              )
          ); 

          if(newRecipes.length > 0){
            setPage((prevPage) => prevPage + 1);
          }
          return [...prevRecipes, ...newRecipes];
        });
       
      } else {
        setHasMore(false); // No more data to load
      }
    } catch (error) {
      console.error("Failed to load recipes", error);
    } finally {
      setLoading(false); // Reset loading flag after API call
    }
  };

   // Initial fetch on component mount
   useEffect(() => {
    fetchRecipes(); // Fetch recipes on component mount
  }, []);

  // Debounce search input changes
  useEffect(() => {
    const debounceSearch = setTimeout(() => {
      fetchRecipes(true); // Reset and fetch new data based on search term
    }, 500);

    return () => clearTimeout(debounceSearch); // Clear timeout on cleanup
  }, [searchTerm, FilterRating, FilterTimeing]);

  const handleSearch = (e: any) => {
    setsearchTerm(e.target.value); // Update search term state
  };

  // loading ui state
  const LoadingUi = (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-4">
      <Card
        className="w-full max-w-sm min-w-[200px] mx-auto space-y-5 p-4"
        radius="lg"
      >
        <Skeleton className="rounded-lg">
          <div className="h-24 rounded-lg bg-default-300"></div>
        </Skeleton>
        <div className="space-y-3">
          <Skeleton className="w-3/5 rounded-lg">
            <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-4/5 rounded-lg">
            <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-2/5 rounded-lg">
            <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
          </Skeleton>
        </div>
      </Card>{" "}
      <Card
        className="w-full max-w-sm min-w-[200px] hidden md:block mx-auto space-y-5 p-4"
        radius="lg"
      >
        <Skeleton className="rounded-lg">
          <div className="h-24 rounded-lg bg-default-300"></div>
        </Skeleton>
        <div className="space-y-3">
          <Skeleton className="w-3/5 rounded-lg">
            <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-4/5 rounded-lg">
            <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-2/5 rounded-lg">
            <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
          </Skeleton>
        </div>
      </Card>{" "}
      <Card
        className=" w-full max-w-sm min-w-[200px] hidden md:block mx-auto space-y-5 p-4"
        radius="lg"
      >
        <Skeleton className="rounded-lg">
          <div className="h-24 rounded-lg bg-default-300"></div>
        </Skeleton>
        <div className="space-y-3">
          <Skeleton className="w-3/5 rounded-lg">
            <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-4/5 rounded-lg">
            <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-2/5 rounded-lg">
            <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
          </Skeleton>
        </div>
      </Card>{" "}
    </div>
  );

  return (
    <div>
      <h1 className="text-center text-2xl font-bold font-sans my-4">
        {" "}
        Recipe Feed
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-between items-center gap-4 p-4  border-2 border-gray-500 rounded-lg  mx-auto mt-6">
        {/* Search Input */}
        <Input
          onChange={handleSearch}
          aria-label="Search"
          classNames={{
            inputWrapper: "bg-default-100",
            input: "text-sm",
          }}
          labelPlacement="outside"
          placeholder="Search..."
          startContent={
            <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
          }
          type="search"
        />

        {/* Dropdowns */}
        <Select
          label="Recipie Rating"
          placeholder="Recipie Rating"
          className="max-w-xs"
          onChange={(e : any) => setFilterRating(e.target.value)}
        >
          <SelectItem value={1} key={""}>All</SelectItem>
          <SelectItem value={1} key={"1"}>1</SelectItem>
          <SelectItem value={2} key={"2"} >2</SelectItem>
          <SelectItem value={3} key={"3"} >3</SelectItem>
          <SelectItem value={4} key={"4"}>4</SelectItem>
          <SelectItem value={5} key={"5"}>5</SelectItem>
        </Select>

        <Select 
          label="Max Time Duration"
          placeholder="Select max Time Duration"
          className="max-w-xs"
          onChange={(e : any) => setFilterTimeing(e.target.value)}
        >
          <SelectItem value={10} key={""}>All</SelectItem>
          <SelectItem value={10} key={"10"}>10m</SelectItem>
          <SelectItem value={20} key={'20'}>20m</SelectItem>
          <SelectItem value={30} key={"30"}>30m</SelectItem>
          <SelectItem value={40} key={"40"}>40m</SelectItem>
          <SelectItem value={50} key={'50'}>50m</SelectItem>
          <SelectItem value={60} key={"60"}>60m</SelectItem>
        </Select>
      </div>

      <InfiniteScroll
        dataLength={Recipies.length} //This is important field to render the next data
        next={fetchRecipes}
        hasMore={hasMore}
        loader={LoadingUi}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        // below props only if you need pull down functionality
        refreshFunction={() => console.log("refecth")} // Refresh when pulling down
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
        pullDownToRefreshContent={
          <h3 style={{ textAlign: "center" }}>&#8595; Pull down to refresh</h3>
        }
        releaseToRefreshContent={
          <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
        }
      >
        {(Recipies.length == 0 && !loading) && <div className="text-center text-2xl font-bold mt-10">No Recipie Found</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-4">
          {Recipies?.map((recipie: any) => (
            <RecipePostCard key={recipie._id} recipe={recipie} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default RecipiesPost;
