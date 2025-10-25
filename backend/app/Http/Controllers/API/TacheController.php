<?php

namespace App\Http\Controllers\Api;

use App\Models\Tache;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class TacheController extends Controller
{
    public function index()
    {
        return Tache::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'text' => 'required|string|max:255',
        ]);

        $tache = Tache::create([
            'text' => $request->text,
            'completed' => false,
        ]);

        return response()->json($tache, 201);
    }

    public function show($id)
    {
        $tache = Tache::findOrFail($id);
        return response()->json($tache);
    }

    public function update(Request $request, $id)
    {
        $tache = Tache::findOrFail($id);

        $request->validate([
            'text' => 'sometimes|string|max:255',
            'completed' => 'sometimes|boolean',
        ]);

        $tache->update($request->only(['text', 'completed']));

        return response()->json($tache);
    }

    public function destroy($id)
    {
        $tache = Tache::findOrFail($id);
        $tache->delete();

        return response()->json(['message' => 'Tâche supprimée']);
    }
}
