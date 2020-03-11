<template>
    <div id="login">
        <div class="login-wrap">
            <ul class="menu-tab">
                <li
                    :class="{ current: item.current }"
                    v-for="(item, index) in menuTab"
                    :key="index"
                    @click="toggleMenu(item)"
                >
                    {{ item.txt }}
                </li>
            </ul>
            <el-form
                :model="ruleForm"
                status-icon
                :rules="rules"
                ref="ruleForm"
                class="login-form"
                size="small"
            >
                <el-form-item prop="username" class="item-form">
                    <label for>邮箱</label>
                    <el-input
                        type="text"
                        v-model="ruleForm.username"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="password" class="item-form">
                    <label for>密码</label>
                    <el-input
                        type="text"
                        v-model="ruleForm.password"
                        autocomplete="off"
                        minlength="6"
                        maxlength="20"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    prop="confirmPassword"
                    class="item-form"
                    v-if="model === 'register'"
                >
                    <label for>重复密码</label>
                    <el-input
                        type="text"
                        v-model="ruleForm.confirmPassword"
                        autocomplete="off"
                        minlength="6"
                        maxlength="20"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="code" class="item-form">
                    <label for>验证码</label>
                    <el-row :gutter="12">
                        <el-col :span="16">
                            <div class="grid-content bg-purple">
                                <el-input
                                    v-model.number="ruleForm.code"
                                ></el-input>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-button
                                    type="success"
                                    @click="submitForm('ruleForm')"
                                    class="block"
                                    >验证码</el-button
                                >
                            </div>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item class="item-form submit">
                    <el-button
                        type="danger"
                        @click="submitForm('ruleForm')"
                        class="block"
                        >提交</el-button
                    >
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import {
    stripScript,
    validateEmail,
    validatePass,
    validateCode
} from "utils/validate";
import { reactive, ref, isRef, onMounted } from "@vue/composition-api";
export default {
    name: "login",
    setup(props, { refs }) {
        let validateUsername = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入用户名"));
            } else if (!validateEmail(value)) {
                callback(new Error("用户名格式有误!"));
            } else {
                callback();
            }
        };
        let validatePassword = (rule, value, callback) => {
            ruleForm.password = stripScript(value);
            value = ruleForm.password;
            if (value === "") {
                callback(new Error("请输入密码"));
            } else if (!validatePass(value)) {
                callback(new Error("密码为6-20位数字加字母"));
            } else {
                callback();
            }
        };
        let validateConfirmPassword = (rule, value, callback) => {
            ruleForm.confirmPassword = stripScript(value);
            value = ruleForm.confirmPassword;
            if (value === "") {
                callback(new Error("请再次输入密码"));
            } else if (value !== ruleForm.password) {
                callback(new Error("密码不一致!"));
            } else {
                callback();
            }
        };
        let checkCode = (rule, value, callback) => {
            ruleForm.code = stripScript(value);
            value = ruleForm.code;
            if (!value) {
                return callback(new Error("请输入验证码"));
            } else if (!validateCode(value)) {
                callback(new Error("验证码格式有误!"));
            } else {
                callback();
            }
        };
        /* 这里放置data数据，生命周期，自定义的函数 */
        console.log(props);
        // console.log(context);
        const menuTab = reactive([
            { txt: "登录", current: true, type: "login" },
            { txt: "注册", current: false, type: "register" }
        ]);
        // console.log(menuTab);
        const model = ref("login");
        // console.log(model);
        console.log(isRef(model));
        // const aa = reactive({
        //     x: 1,
        //     y: "ii"
        // });
        // const bb = toRefs(aa);
        // console.log(bb.x.value);
        const ruleForm = reactive({
            username: "",
            password: "",
            code: "",
            confirmPassword: ""
        });
        const rules = reactive({
            username: [{ validator: validateUsername, trigger: "blur" }],
            password: [{ validator: validatePassword, trigger: "blur" }],
            code: [{ validator: checkCode, trigger: "blur" }],
            confirmPassword: [
                { validator: validateConfirmPassword, trigger: "blur" }
            ]
        });
        onMounted(() => {});
        const toggleMenu = params => {
            console.log(params);
            menuTab.forEach(element => {
                element.current = false;
            });
            params.current = true;
            model.value = params.type;
        };
        const submitForm = formName => {
            refs[formName].validate(valid => {
                if (valid) {
                    alert("submit!");
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        };
        return {
            menuTab,
            model,
            ruleForm,
            rules,
            toggleMenu,
            submitForm
        };
    }
};
</script>
<style lang="scss" scoped>
#login {
    height: 100vh; // 100%可视区域
    background-color: #344a5f;
}
ul,
li {
    margin: 0;
    padding: 0;
}
.login-wrap {
    width: 330px;
    margin: 0 auto;
    .menu-tab {
        text-align: center;
        li {
            display: inline-block;
            width: 88px;
            line-height: 36px;
            font-size: 14px;
            color: #fff;
            border-radius: 2px;
            cursor: pointer;
        }
        .current {
            background-color: rgba(0, 0, 0, 0.1);
        }
    }
    .login-form {
        margin-top: 30px;
        label {
            color: #fff;
            margin-bottom: 3px;
            display: block;
            font-size: 14px;
        }
        .item-form {
            margin-bottom: 12px;
            .block {
                width: 100%;
                display: block;
            }
            &.submit {
                margin-top: 35px;
            }
        }
    }
}
</style>
