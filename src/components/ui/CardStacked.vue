<template>
    <div class="card">
        <div class="header"><strong><slot name="header"></slot></strong></div>
        <div class="card-content black-text">
            <div class="row">
                <div class="col s12 left-align">
                    <slot name="parameters"></slot>
                </div>
            </div>
            <div class="row">
                <div class="col s12 black-text center-align">
                    <slot name="results"></slot>
                </div>
            </div>
        </div>
        <div class="card-action grey lighten-1 brown-text">
            <slot name="footnotes"></slot>
        </div>
    </div>
</template>

<script>
    export default{
        name: 'input-card-stacked'
    }

</script>

<style scoped>
.card-content{
    margin-top:0px;
    padding-top:5px;
}
div.header {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex: 1 100%;
    font-size : 1.5em;
    color : #FFFFFF;
    background: #455a64;
    padding: 0px;
    margin : 0px;
}

div.social{
    display : flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
</style>