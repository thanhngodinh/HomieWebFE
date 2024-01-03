import { CallBackParam } from './../../models/common';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Compare, Post, HostelCreate, HostelFilter } from '../../models/hostel';
import { hostelApi } from '../../api/hostelApi';
import { Rate } from '../../models/rate';

export interface HostelState {
  loading?: boolean;
  list: Post[];
  listAll?: Post[];
  compareHostel1?: Post;
  compareHostel2?: Post;
  listSuggest?: Post[];
  totalSuggest?: number;
  total: number;
  hostel?: Post;
  error?: boolean;
}

const initialState: HostelState = {
  loading: false,
  list: [],
  listAll: [],
  total: 0,
};

export const postHostelsWithQuerryParams = createAsyncThunk(
  'hostel/postHostelsWithQuerryParams',
  async (query?: HostelFilter) => {
    try {
      const response = await hostelApi.searchPost(query);
      return response;
    } catch (error) {
      console.error(error);
    }
  }
);

export const elasticSearch = createAsyncThunk(
  'hostel/elasticSearch',
  async (query?: HostelFilter) => {
    try {
      const response = await hostelApi.elasticSearch(query);
      return response;
    } catch (error) {
      console.error(error);
    }
  }
);

export const elasticSearchForMap = createAsyncThunk(
  'hostel/elasticSearchForMap',
  async (query?: HostelFilter) => {
    try {
      if (query?.pageSize) {
        delete query?.pageSize;
      }
      if (query?.pageIdx) {
        delete query?.pageIdx;
      }
      const response = await hostelApi.elasticSearch(query);
      return response;
    } catch (error) {
      console.error(error);
    }
  }
);

export const getHostelsWithQuerryParams = createAsyncThunk(
  'hostel/getHostelsWithQuerryParams',
  async (query?: HostelFilter) => {
    try {
      const response = await hostelApi.searchGet(query);
      return response;
    } catch (error) {
      console.error(error);
    }
  }
);

export const getHostelSuggest = createAsyncThunk(
  'hostel/getHostelSuggest',
  async () => {
    try {
      const response = await hostelApi.getSuggest({});
      return response;
    } catch (error) {
      console.error(error);
    }
  }
);

export const getHostelById = createAsyncThunk(
  'hostel/getHostelById',
  async (id: string) => {
    try {
      const response = await hostelApi.getById(id);
      return response;
    } catch (error) {
      console.error(error);
    }
  }
);

export const getCompare = createAsyncThunk(
  'hostel/getCompare',
  async (compare: Compare) => {
    try {
      const response = await hostelApi.getCompare(compare);
      return response;
    } catch (error) {
      console.error(error);
    }
  }
);

export const checkCreatePost = createAsyncThunk(
  'hostel/checkCreatePost',
  async (callback: any) => {
    try {
      const response = await hostelApi.checkCreatePost();
      callback(response?.status);
      return response;
    } catch (error) {
      console.error(error);
    }
  }
);

export const createHostel = createAsyncThunk(
  'hostel/createHostel',
  async (hostel: CallBackParam<HostelCreate>) => {
    try {
      const response = await hostelApi.createPost(hostel.data);
      hostel.callback && hostel.callback();
      return response;
    } catch (error) {
      console.error(error);
    }
  }
);

export const updatePost = createAsyncThunk(
  'hostel/updatePost',
  async (hostel: CallBackParam<HostelCreate>) => {
    try {
      const response = await hostelApi.updatePost(hostel.data);
      hostel.callback && hostel.callback();
      return response;
    } catch (error) {
      console.error(error);
    }
  }
);
export const deletePost = createAsyncThunk(
  'hostel/deletePost',
  async (id: string) => {
    try {
      const response = await hostelApi.deletePost(id);
      return response;
    } catch (error) {
      console.error(error);
    }
  }
);

export const hiddenPost = createAsyncThunk(
  'hostel/hiddenPost',
  async (id: string) => {
    try {
      const response = await hostelApi.hiddenPost(id);
      return response;
    } catch (error) {
      console.error(error);
    }
  }
);

export const activePost = createAsyncThunk(
  'hostel/activePost',
  async (id: string) => {
    try {
      const response = await hostelApi.activePost(id);
      return response;
    } catch (error) {
      console.error(error);
    }
  }
);

export const extendPost = createAsyncThunk(
  'hostel/extendPost',
  async (id: string) => {
    try {
      const response = await hostelApi.extendPost(id);
      return response;
    } catch (error) {
      console.error(error);
    }
  }
);

export const likePost = createAsyncThunk(
  'hostel/likePost',
  async (postId: string) => {
    try {
      const response = await hostelApi.likePost(postId);
      return response;
    } catch (error) {
      console.error(error);
    }
  }
);

export const ratePost = createAsyncThunk(
  'hostel/ratePost',
  async (rate: Rate) => {
    try {
      const response = await hostelApi.ratePost(rate);
      return response;
    } catch (error) {
      console.error(error);
    }
  }
);

export const hostelSlice = createSlice({
  name: 'hostel',
  initialState,
  reducers: {
    setHostel(state, action) {
      state.list = action.payload?.data;
    },
  },
  extraReducers: (builder) => {
    builder
      // suggest
      .addCase(getHostelSuggest.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getHostelSuggest.fulfilled, (state, action) => {
        state.listSuggest = action.payload?.data || [];
        state.totalSuggest = action.payload?.total || 0;
        state.loading = false;
        state.error = false;
      })
      .addCase(getHostelSuggest.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
      })
      // create
      .addCase(createHostel.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(createHostel.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
      })
      .addCase(createHostel.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
      })
      // edit
      .addCase(updatePost.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
      })
      // active
      .addCase(activePost.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(activePost.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
      })
      .addCase(activePost.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
      })
      // hidden
      .addCase(hiddenPost.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(hiddenPost.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
      })
      .addCase(hiddenPost.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
      })
      // extend
      .addCase(extendPost.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(extendPost.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
      })
      .addCase(extendPost.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
      })
      // delete
      .addCase(deletePost.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
      })
      // ratePost
      .addCase(ratePost.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(ratePost.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
      })
      .addCase(ratePost.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
      })
      //getHostelById
      .addCase(getHostelById.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getHostelById.fulfilled, (state, action) => {
        state.hostel = action.payload?.data || undefined;
        console.log(state.hostel);
        state.loading = false;
        state.error = false;
      })
      .addCase(getHostelById.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
      })
      //getCompare
      .addCase(getCompare.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getCompare.fulfilled, (state, action) => {
        state.compareHostel1 = action.payload?.data?.post1 || undefined;
        state.compareHostel2 = action.payload?.data?.post2 || undefined;
        state.loading = false;
        state.error = false;
      })
      .addCase(getCompare.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
      })
      //elasticSearch
      .addCase(elasticSearch.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(elasticSearch.fulfilled, (state, action) => {
        state.list = action.payload?.data || [];
        state.total = action.payload?.total || 0;
        state.loading = false;
        state.error = false;
      })
      .addCase(elasticSearch.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
      })
      //elasticSearchForMap
      .addCase(elasticSearchForMap.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(elasticSearchForMap.fulfilled, (state, action) => {
        state.listAll = action.payload?.data || [];
        state.total = action.payload?.total || 0;
        state.loading = false;
        state.error = false;
      })
      .addCase(elasticSearchForMap.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
      })
      //postHostelWithQuerryParams
      .addCase(postHostelsWithQuerryParams.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(postHostelsWithQuerryParams.fulfilled, (state, action) => {
        state.list = action.payload?.data || [];
        state.total = action.payload?.total || 0;
        state.loading = false;
        state.error = false;
      })
      .addCase(postHostelsWithQuerryParams.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(getHostelsWithQuerryParams.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getHostelsWithQuerryParams.fulfilled, (state, action) => {
        state.list = action.payload?.data || [];
        state.total = action.payload?.total || 0;
        // console.log(state.list);
        state.loading = false;
        state.error = false;
      })
      .addCase(getHostelsWithQuerryParams.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export const selectHostels = (state: any) => state.hostel;
export const selectLoadingState = (state: any) => state.hostel.loading;
export const selectErrorState = (state: any) => state.hostel.error;

export const hostelAction = hostelSlice.actions;

export const { setHostel } = hostelSlice.actions;

export default hostelSlice.reducer;
