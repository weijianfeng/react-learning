package com.wjf.hybrid.base;

import android.app.Activity;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactRootView;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.wjf.hybrid.MyApplication;

/**
 * Created by weijianfeng on 2017/5/1.
 */

public abstract class BaseReactFragment extends Fragment{

    private ReactRootView mReactRootView;
    private ReactInstanceManager mReactInstanceManager;

    @Override
    public void onAttach(Activity activity) {
        super.onAttach(activity);
        mReactRootView = new ReactRootView(activity);
        mReactInstanceManager = ((MyApplication) getActivity().getApplication()).getReactNativeHost().getReactInstanceManager();
    }

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        super.onCreateView(inflater, container, savedInstanceState);
        return mReactRootView;
    }

    @Override
    public void onViewCreated(View view, Bundle savedInstanceState) {
    }

    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);
        mReactRootView.startReactApplication(mReactInstanceManager, getMainPageName(), null);
    }

    protected abstract String getMainPageName();

    protected void sendEvent(String eventName,
                             @Nullable WritableMap params) {
        if (((MyApplication) getActivity().getApplication()).getReactContext() != null) {
            ((MyApplication) getActivity().getApplication()).getReactContext()
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit(eventName, params);
        }
    }
}
