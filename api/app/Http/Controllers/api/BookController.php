<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Book;
use Exception;
use Illuminate\Http\Request;
use Throwable;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $books = Book::all(['title', 'author', 'description', 'published_date', 'isbn']);

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
    public function store(Request $request)
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
                    "name" => $book->title,
                    "isbn" => $book->isbn
                ]
            ], 201);
        } catch (Throwable $e) {
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
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
