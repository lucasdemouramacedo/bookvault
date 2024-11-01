<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\BookRequest;
use App\Models\Book;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Exceptions\Renderer\Exception as RendererException;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Throwable;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $title = $request->input('title');

            $books = Book::when($title, function ($query, $title) {
                return $query->where('title', 'like', '%' . $title . '%');
            })->paginate(10);

            return response()->json([
                "books" => $books
            ], 200);
        } catch (Throwable $e) {
            return response()->json([
                "error" => [
                    "message" => "Ocorreu um erro ao carregar a lista de livros",
                    "details" => $e->getMessage()
                ]
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(BookRequest $request)
    {
        try {
            $book = Book::create([
                'title' => $request->title,
                'author' => $request->author,
                'description' => $request->description,
                'published_date' => $request->published_date,
                'isbn' => $request->isbn,
            ]);

            return response([
                "message" => "Livro cadastrado com sucesso",
                "book" => [
                    "id" => $book->id,
                    "title" => $book->title,
                    "author" => $book->author,
                    "description" => $book->description,
                    "published_date" => $book->published_date,
                    "isbn" => $book->isbn
                ]
            ], 201);
        } catch (Exception $e) {
            return response(
                [
                    "error" => [
                        "message" => "Ocorreu um erro ao cadastrar o livro",
                        "details" => $e->getMessage()
                    ]
                ],
                400
            );
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $book = Book::findOrFail($id);

            return response()->json([
                "message" => "Livro encontrado com sucesso",
                "book" => [
                    "id" => $book->id,
                    "title" => $book->title,
                    "author" => $book->author,
                    "description" => $book->description,
                    "published_date" => $book->published_date,
                    "isbn" => $book->isbn
                ]
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                "error" => [
                    "message" => "Livro não encontrado"
                ]
            ], 404);
        } catch (Throwable $e) {
            return response()->json([
                "error" => [
                    "message" => "Ocorreu um erro ao buscar o livro",
                    "details" => $e->getMessage()
                ]
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(BookRequest $request, string $id)
    {
        try {
            $book = Book::findOrFail($id);
            $book->update([
                "title" => $request->title,
                "author" => $request->author,
                "description" => $request->description,
                "published_date" => $request->published_date,
                "isbn" => $request->isbn
            ]);

            return response()->json([
                "message" => "Livro atualizado com sucesso",
                "book" => [
                    "id" => $book->id,
                    "title" => $book->title,
                    "author" => $book->author,
                    "description" => $book->description,
                    "published_date" => $book->published_date,
                    "isbn" => $book->isbn
                ]
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                "error" => [
                    "message" => "Livro não encontrado"
                ]
            ], 404);
        } catch (Throwable $e) {
            return response()->json([
                "error" => [
                    "message" => "Ocorreu um erro ao atualizar o livro",
                    "details" => $e->getMessage()
                ]
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $book = Book::findOrFail($id);
            $book->destroy($id);

            return response()->json([
                "message" => "Livro deletado com sucesso",
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                "error" => [
                    "message" => "Livro não encontrado"
                ]
            ], 404);
        } catch (Throwable $e) {
            return response()->json([
                "error" => [
                    "message" => "Ocorreu um erro ao tentar deletar o livro",
                    "details" => $e->getMessage()
                ]
            ], 500);
        }
    }

    /**
     * Display a listing of the resource by book title.
     */
    public function search(Request $request)
    {
        try {
            $books = Book::where('title', 'like', '%' . $request->title . '%')->paginate(10);

            return response()->json([
                "books" => $books
            ], 200);
        } catch (Throwable $e) {
            return response()->json([
                "error" => [
                    "message" => "Ocorreu um erro ao carregar a lista de livros",
                    "details" => $e->getMessage()
                ]
            ], 500);
        }
    }
}
