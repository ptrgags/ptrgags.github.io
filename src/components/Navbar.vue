<template>
    <header>
        <div class="title">Peter Gagliardi</div>
        <nav>
            <ul>
                <li>Gallery</li>
                <li>Projects</li>
                <li>Library</li>
            </ul>
        </nav>
    </header>
</template>

<style>
header {
    height: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: black;
    color: white;
}

.title {
    justify-self: flex-start;
    padding: 4px;
    flex-grow: 1;
}

li {
    /** Turns off the bullets */
    list-style: none;
    /** Make them appear on one line */
    display: inline-block;
    padding: 4px;
}
</style>