<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BookRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $bookId = $this->route('id');
        return [
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'description' => 'nullable|string',
            'published_date' => 'nullable|date',
            'isbn' => 'required|string|unique:books,isbn,' . $bookId
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required' => 'O título é obrigatório.',
            'title.string' => 'O título deve ser um texto.',
            'title.max' => 'O título deve ter no máximo 255 caracteres.',
            'author.required' => 'O autor é obrigatório.',
            'author.string' => 'O autor deve ser um texto.',
            'author.max' => 'O autor deve ter no máximo 255 caracteres.',
            'description.string' => 'A descrição deve ser um texto.', 
            'published_date.date' => 'A data de publicação deve estar em um formato válido.',
            'isbn.required' => 'O ISBN é obrigatório.',
            'isbn.string' => 'O ISBN deve ser um texto.',
            'isbn.unique' => 'O ISBN já está cadastrado para outro livro.'
        ];
    }
}
