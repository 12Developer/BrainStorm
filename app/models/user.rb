class User
  if(ENV['DATABASE_URL'])
      uri = URI.parse(ENV['DATABASE_URL'])
      DB = PG.connect(uri.hostname, uri.port, nil, nil, uri.path[1..-1], uri.user, uri.password)
  else
      DB = PG.connect(:host => "localhost", :port => 5432, :dbname => 'ideaApp_development')
  end

  def self.all
    results = DB.exec(
        <<-SQL
          SELECT users.*,
          ideas.id AS idea_id,
          ideas.idea_title AS idea_title,
          ideas.idea_content AS idea_content,
          ideas.user_id AS idea_user_id
          FROM users
          LEFT JOIN ideas
            ON users.id = ideas.user_id
          ORDER BY users.id ASC;
        SQL
    )
    users = []
    last_user_id = nil
    results.each do |result|
      if result["id"] != last_user_id
        users.push({
          "id"=>result["id"].to_i,
          "username" => result["username"],
          "password" => result["password"],
          "ideas" => []
          })
          last_user_id = result["id"]
      end
      if result["idea_id"]
        new_idea = {
          "id" => result["idea_id"].to_i,
          "idea_title" => result["idea_title"],
          "idea_content" => result["idea_content"]
        }
        users.last["ideas"].push(new_idea)
      end
    end
    return users
  end

  def self.find(id)
  p  '=================================='
  p id
  p '===================================='
    results = DB.exec(
        <<-SQL
          SELECT users.*,
          ideas.id AS idea_id,
          ideas.idea_title AS idea_title,
          ideas.idea_content AS idea_content,
          ideas.user_id AS idea_user_id
          FROM users
          LEFT JOIN ideas
            ON ideas.user_id = users.id
          WHERE users.id =#{id}
        SQL
    )
    ideas = []
    results.each do |result|
      if result["idea_id"]
        ideas.push({
          "id" => result["idea_id"].to_i,
          "idea_title" => result["idea_title"],
          "idea_content" => result["idea_content"]
        })
      end
    end
    return {
        "id" => results.first["id"].to_i,
        "username" => results.first["username"],
        "password" => results.first["password"],
        "ideas" => ideas
    }
  end

  def self.create(opts)
    results = DB.exec(
        <<-SQL
            INSERT INTO users (username, password)
            VALUES ( '#{opts["username"]}', '#{opts["password"]}' )
            RETURNING id, username, password;
        SQL
    ).first
    return {
        "id" => results["id"].to_i,
        "username" => results["username"],
        "password" => results["password"]
    }
  end

  def self.delete(id)
    results = DB.exec("DELETE FROM users WHERE id=#{id};")
    return {"deleted" => true}
  end

  def self.update(id, opts)
    results = DB.exec(
        <<-SQL
            UPDATE users
            SET username = '#{opts["username"]}', password = '#{opts["password"]}'
            WHERE id = #{id}
            RETURNING id, username, password
        SQL
    ).first
    return {
        "id" => results["id"].to_i,
        "username" => results["username"],
        "password" => results["password"]
    }
  end

  def self.findByName(name)
    results = DB.exec(
        <<-SQL
          SELECT users.*,
          ideas.id AS idea_id,
          ideas.idea_title AS idea_title,
          ideas.idea_content AS idea_content,
          ideas.user_id AS idea_user_id
          FROM users
          LEFT JOIN ideas
            ON users.id = ideas.user_id
          WHERE users.username =#{name};
        SQL
    )
    ideas = []
    results.each do |result|
      if result["idea_id"]
        ideas.push({
          "id" => result["idea_id"].to_i,
          "idea_title" => result["idea_title"],
          "idea_content" => result["idea_content"],
          "username" => result["username"]
        })
      end
    end
    return {
        "id" => results.first["id"].to_i,
        "username" => results.first["username"],
        "password" => results.first["password"],
        "ideas" => ideas
    }
  end
end
