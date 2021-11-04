<template>
    <v-data-table
        :headers="headers"
        :items="drinks"
        :search="search"
        sort-by="calories"
        class="elevation-1"
    >
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>DRINK TABLE</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                ></v-text-field>
                <v-spacer></v-spacer>

                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            color="primary"
                            dark
                            class="mb-2"
                            v-bind="attrs"
                            v-on="on"
                        >
                            New Drink
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            v-model="editedItem.name"
                                            label="Drink name"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-select
                                            v-model="editedItem.drinkType"
                                            :items="itemsTypes"
                                            label="Drink Type"
                                        ></v-select>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            v-model="editedItem.sugar"
                                            label="Sugar (g)"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            v-model="editedItem.water"
                                            label="Water (ml)"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            v-model="editedItem.price"
                                            label="Price (Rp)"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="close">
                                Cancel
                            </v-btn>
                            <v-btn color="blue darken-1" text @click="save">
                                Save
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

                <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                        <v-card-title class="headline"
                            >Are you sure you want to delete this
                            item?</v-card-title
                        >
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="blue darken-1"
                                text
                                @click="closeDelete"
                                >Cancel</v-btn
                            >
                            <v-btn
                                color="blue darken-1"
                                text
                                @click="deleteItemConfirm"
                                >OK</v-btn
                            >
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
    </v-data-table>
</template>

<script>
//tambahkan ini untuk import database reference
import { drinkRef } from "../firebase";

export default {
    data: () => ({
        dialog: false,
        dialogDelete: false,
        search: "",
        itemsTypes: ["Ice", "Hot"],
        headers: [
            {
                text: "Drink Code Name",
                align: "start",
                sortable: false,
                value: "name",
            },
            { text: "Ice/Hot", value: "drinkType" },
            { text: "Sugar (g)", value: "sugar" },
            { text: "Water (ml)", value: "water" },
            { text: "Price (Rp)", value: "price" },
            { text: "Actions", value: "actions", sortable: false },
        ],
        drinks: [],
        editedIndex: -1,
        editedItem: {
            name: "",
            drinkType: 0,
            sugar: 0,
            water: 0,
            price: 0,
        },
        defaultItem: {
            name: "",
            drinkType: 0,
            sugar: 0,
            water: 0,
            price: 0,
        },
    }),

    //tambahkan attribute firebase disini
    firebase: {
        drinks: drinkRef,
    },

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? "New Item" : "Edit Item";
        },
    },

    watch: {
        dialog(val) {
            val || this.close();
        },
        dialogDelete(val) {
            val || this.closeDelete();
        },
    },

    methods: {
        editItem(item) {
            this.editedIndex = item[".key"];
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },

        deleteItem(item) {
            this.editedIndex = item[".key"];
            this.editedItem = Object.assign({}, item);
            this.dialogDelete = true;
        },

        deleteItemConfirm() {
            //tambahkan ini untuk delete data
            drinkRef
                .child(this.editedIndex)
                .remove()
                .then(() => {
                    alert("Berhasil Hapus Data !");
                })
                .catch((err) => [alert("Gagal Hapus Data: ", err)]);
            this.closeDelete();
        },

        close() {
            this.dialog = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },

        closeDelete() {
            this.dialogDelete = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },

        save() {
            if (this.editedIndex != -1) {
                //tambahkan ini untuk edit data
                drinkRef
                    .child(this.editedIndex)
                    .set(this.editedItem)
                    .then(() => {
                        alert("Berhasil Edit Data !");
                    })
                    .catch((err) => [alert("Gagal Edit Data: ", err)]);
            } else {
                //tambahkan code ini untuk create data ke db
                drinkRef
                    .push(this.editedItem)
                    .then(() => {
                        alert("Berhasil Tambah Data !");
                    })
                    .catch((err) => [alert("Gagal Tambah Data: ", err)]);
            }
            this.close();
        },
    },
};
</script>
