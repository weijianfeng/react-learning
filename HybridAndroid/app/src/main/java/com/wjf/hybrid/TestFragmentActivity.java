package com.wjf.hybrid;

import android.os.Bundle;
import android.support.v4.app.FragmentActivity;

/**
 * Created by weijianfeng on 2017/6/3.
 */

public class TestFragmentActivity extends FragmentActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_testfragment);

        getSupportFragmentManager().beginTransaction().replace(R.id.container, new TestRNFragment())
                .commitAllowingStateLoss();
    }
}
