<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
    Schema::table('post_likes', function (Blueprint $table) {
        $table->unique(['postId', 'userId']);
    });

    Schema::table('comment_likes', function (Blueprint $table) {
        $table->unique(['commentId', 'userId']);
    });

    Schema::table('replies_likes', function (Blueprint $table) {
        $table->unique(['replyId', 'userId']);
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('post_likes', function (Blueprint $table) {
            $table->dropUnique(['postId', 'userId']);
        });

        Schema::table('comment_likes', function (Blueprint $table) {
            $table->dropUnique(['commentId', 'userId']);
        });

        Schema::table('replies_likes', function (Blueprint $table) {
            $table->dropUnique(['replyId', 'userId']);
        });
    }
};