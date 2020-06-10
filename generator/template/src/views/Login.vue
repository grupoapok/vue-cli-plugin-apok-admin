
<template>
    <div id="login-container">
        <div class="column">
            <div class="card">
                <div class="card-content">
                    <form-renderer
                            buttons-alignment="centered"
                            :fields="formFields"
                            :form-var="user"
                            :show-cancel="false"
                            submit-button-text="Login"
                            submit-button-icon="arrow-circle-right"
                            :loading="loading"
                            @submit="doSubmit"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex';

    export default {
        name: 'Login',
        data() {
            return {
                user: {
                    username: null,
                    password: null
                },
                formFields: [
                    [
                        {
                            model: 'username',
                            props: {
                                placeholder: 'Username',
                            }
                        }
                    ],
                    [
                        {
                            model: 'password',
                            type: 'password',
                            props: {
                                placeholder: 'Password',
                            }
                        }
                    ]
                ]
            };
        },
        computed: {
            ...mapState('auth', ['loading']),
            ...mapState('messages', ['fields']),
        },
        methods: {
            ...mapActions('auth', ['doLogin']),
            doSubmit() {
                this.doLogin({
                    username: this.user.username,
                    password: this.user.password
                })
            }
        },
    };
</script>

<style lang="scss">
    #login-container {
        min-height: 100vh;
        display: flex;
        justify-content: center;
        & > .column {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            max-width: 425px;
            width: 425px;
            .card {
                width: 100%;
            }
            .card-content {
                padding: 1em;
            }
            & > .field {
                width: 100%;
            }
        }
    }
</style>
