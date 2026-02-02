export const createNotesApi = client => ({
  async getNotes() {
    const res = await client.get('/api/v1/notes');
    return res.data.data.notes;
  },
  async getNote(id) {
    const res = await client.get(`/api/v1/notes/${id}`);
    return res.data.data.note;
  },
  async createNote(payload) {
    const res = await client.post('/api/v1/notes', payload);
    return res.data.data.note;
  },
  async updateNote(id, payload) {
    const res = await client.patch(`/api/v1/notes/${id}`, payload);
    return res.data.data.note;
  },
  async deleteNote(id) {
    const res = await client.delete(`/api/v1/notes/${id}`);
    return {success: true};
  },
});
