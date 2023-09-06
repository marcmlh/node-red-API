import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('characters', (table) => {
        table.string('character_name').notNullable()
        table.string('character_hair_color').notNullable()
        table.string('character_gender').notNullable()
        table.string('character_homeland').notNullable()
        table.boolean('is_active').notNullable()
        table.string('created_at').notNullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('characters')
}